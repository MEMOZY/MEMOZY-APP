import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { CheckIcon } from "@/assets/images/icons";
import Button from "@/components/common/Button";
import { useUI } from "@/hooks/useUI";
import { getPresignedUrls, uploadToPresignedUrl } from "@/api/file";
import { MemoryItem, postMemoryTemp } from "@/api/memory";
import { router } from "expo-router";
import { extractSelectedMetadata } from "@/utils/metadata";

const MAX_SELECT_COUNT = 30;
const GAP = 20;
const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_SIZE = (SCREEN_WIDTH - GAP * NUM_COLUMNS - 40) / NUM_COLUMNS;

export default function SelectScreen() {
    const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [endCursor, setEndCursor] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [libraryPermissionResponse, requestLibraryPermission] =
        MediaLibrary.usePermissions();
    const [locationPermissionResponse, requestLocationPermission] =
        Location.useForegroundPermissions();

    const { showSnackbar } = useUI();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadInitialAssets();
    }, [libraryPermissionResponse, locationPermissionResponse]);

    const loadInitialAssets = async () => {
        if (!libraryPermissionResponse || !locationPermissionResponse) {
            return;
        }
        if (libraryPermissionResponse.status !== "granted") {
            const { status } = await requestLibraryPermission();
            if (status !== "granted") return;
        }
        if (locationPermissionResponse.status !== "granted") {
            const { status } = await requestLocationPermission();
            if (status !== "granted") return;
        }

        const result = await MediaLibrary.getAssetsAsync({
            mediaType: ["photo"],
            first: 30,
            sortBy: ["creationTime"],
        });

        setAssets(result.assets);
        setEndCursor(result.endCursor || null);
        setHasNextPage(result.hasNextPage);
    };

    const fetchNextAssets = async () => {
        if (!hasNextPage || isLoading) return;
        setIsLoading(true);

        const result = await MediaLibrary.getAssetsAsync({
            mediaType: ["photo"],
            first: 30,
            after: endCursor || undefined,
            sortBy: ["creationTime"],
        });

        setAssets((prev) => [...prev, ...result.assets]);
        setEndCursor(result.endCursor || null);
        setHasNextPage(result.hasNextPage);
        setIsLoading(false);
    };

    const toggleSelect = (id: string) => {
        setSelected((prev) => {
            if (prev.includes(id)) return prev.filter((x) => x !== id);
            if (prev.length >= MAX_SELECT_COUNT) {
                showSnackbar({
                    message: `최대 ${MAX_SELECT_COUNT}개까지 선택할 수 있습니다.`,
                    color: Colors.red,
                });
                return prev;
            }
            return [...prev, id];
        });
    };

    const renderItem = ({ item }: { item: MediaLibrary.Asset }) => {
        const isSelected = selected.includes(item.id);
        return (
            <Pressable
                onPress={() => {
                    toggleSelect(item.id);
                }}
                style={styles.cell}
            >
                <Image source={{ uri: item.uri }} style={styles.image} />
                {isSelected && (
                    <View style={styles.overlay}>
                        <CheckIcon />
                    </View>
                )}
            </Pressable>
        );
    };

    return (
        <PageLayout
            headerTitle="기록할 사진 선택"
            headerRight={
                <ThemedText
                    type="body2b"
                    lightColor={Colors.gray4}
                    darkColor={Colors.gray4}
                >
                    ({selected.length}/{MAX_SELECT_COUNT})
                </ThemedText>
            }
            hasBack
            backText="취소"
        >
            <FlatList
                data={assets}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={NUM_COLUMNS}
                columnWrapperStyle={{ gap: GAP }}
                contentContainerStyle={{ gap: GAP }}
                onEndReached={fetchNextAssets}
                onEndReachedThreshold={0.8}
                ListFooterComponent={
                    isLoading && hasNextPage ? (
                        <ActivityIndicator style={{ margin: 20 }} />
                    ) : null
                }
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
                <Button
                    title="해제"
                    disabled={selected.length === 0}
                    onPress={() => {
                        setSelected([]);
                    }}
                    backgroundColor={Colors.red}
                    disabledBackgroundColor="#FF6666"
                    style={{ flex: 1 }}
                />
                <Button
                    title="선택 완료"
                    disabled={selected.length === 0}
                    onPress={async () => {
                        if (isSubmitting) return;
                        setIsSubmitting(true);
                        const metadata = await extractSelectedMetadata(
                            selected
                        );
                        try {
                            const validMetadata = metadata
                                .filter((item) => item.uri !== undefined)
                                .map((item) => ({
                                    uri: item.uri!,
                                    filename: item.filename,
                                }));
                            const presignedUrls = await getPresignedUrls(
                                validMetadata
                            );
                            await uploadToPresignedUrl(
                                validMetadata,
                                presignedUrls
                            );
                            const memoryItems: MemoryItem[] = presignedUrls.map(
                                (
                                    item: { preSignedUrl: string },
                                    index: string
                                ) => ({
                                    imageUrl: item.preSignedUrl,
                                    content: "",
                                    sequence: index,
                                })
                            );
                            const sessionId = await postMemoryTemp(memoryItems);
                            const startDate = new Date(
                                metadata[0].creationTime
                            ).toISOString();
                            const endDate = new Date(
                                metadata[metadata.length - 1].creationTime
                            ).toISOString();
                            setIsSubmitting(false);
                            router.replace({
                                pathname: "/(chat-flow)/chat",
                                params: {
                                    sessionId: sessionId,
                                    length: selected.length,
                                    startDate: startDate,
                                    endDate: endDate,
                                },
                            });
                        } catch (error) {
                            setIsSubmitting(false);
                            console.error("파일 업로드 오류:", error);
                            showSnackbar({
                                message: "파일 업로드에 실패했습니다.",
                                color: Colors.red,
                            });
                        }
                    }}
                    style={{ flex: 4 }}
                />
            </View>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    cell: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderWidth: 3,
        borderColor: Colors.green,
        borderRadius: 10,
        backgroundColor: "rgba(50, 215, 75, 0.08)",
        alignItems: "center",
        justifyContent: "center",
    },
});
