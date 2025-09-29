import { MemoryThumbnail, searchMemories } from "@/api/memory";
import PageLayout from "@/components/common/PageLayout";
import Titled from "@/components/common/Titled";
import DetailLog from "@/components/logs/DetailLog";
import LogItem from "@/components/logs/LogItem";
import { SearchBar, SearchMode } from "@/components/search/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";

const firstString = (v: unknown, fallback = ""): string =>
    Array.isArray(v) ? String(v[0] ?? fallback) : String(v ?? fallback);

const isSearchMode = (m: string): m is SearchMode =>
    m === "ALL" || m === "TITLE" || m === "CONTENT";

export default function SearchScreen() {
    const { keyword: keywordParam, mode: modeParam } = useLocalSearchParams();

    const initialKeyword = firstString(keywordParam, "");
    const initialModeStr = firstString(modeParam, "ALL");
    const initialMode: SearchMode = isSearchMode(initialModeStr)
        ? initialModeStr
        : "ALL";

    const [keyword, setKeyword] = useState<string>(initialKeyword);
    const [mode, setMode] = useState<SearchMode>(initialMode);
    const [selectedLog, setSelectedLog] = useState<number | null>(null);

    const {
        data,
        isLoading,
        isFetching,
        isFetchingNextPage,
        isRefetching,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["search", keyword, mode],
        enabled: keyword.trim().length > 0, // 키워드 없으면 호출 안 함
        initialPageParam: 0,
        queryFn: async ({ pageParam }) =>
            searchMemories({
                keyword,
                "search-type": mode, // "TITLE" | "CONTENT" | "ALL"
                page: (pageParam as number) ?? 0,
                size: 10,
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.page + 1,
    });

    const flatData: MemoryThumbnail[] = useMemo(
        () => data?.pages.flatMap((p) => p.content) ?? [],
        [data]
    );

    const onEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, isFetching, fetchNextPage]);

    if (selectedLog !== null) {
        return (
            <DetailLog
                onBackPress={() => setSelectedLog(null)}
                memoryId={selectedLog}
            />
        );
    }

    return (
        <PageLayout
            headerTitle="Search"
            titleAlign="left"
            style={{ gap: 20, paddingBottom: 60 }}
            hasBack
            onBack={() => {
                router.back();
            }}
        >
            <SearchBar
                initialKeyword={keyword ?? ""}
                defaultMode={mode as SearchMode}
                onSearch={({ keyword, mode }) => {
                    setKeyword(keyword);
                    setMode(mode);
                    refetch();
                }}
            />

            <Titled title="Results">
                {error ? (
                    <View style={styles.center}>
                        <Text style={styles.errorText}>
                            검색 중 오류가 발생했습니다. 다시 시도해 주세요.
                        </Text>
                    </View>
                ) : isLoading && keyword.trim().length > 0 ? (
                    <View style={styles.center}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <FlatList
                        data={flatData}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <LogItem
                                id={item.id}
                                imageUrl={item.thumbnailUrl}
                                title={item.title}
                                startDate={new Date(item.startDate)}
                                endDate={new Date(item.endDate)}
                                description={item.content}
                                setSelectedLog={setSelectedLog}
                            />
                        )}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.4}
                        ListFooterComponent={
                            isFetchingNextPage ? (
                                <View style={styles.footer}>
                                    <ActivityIndicator />
                                </View>
                            ) : null
                        }
                        ListEmptyComponent={
                            keyword.trim().length === 0 ? (
                                <View style={styles.center}>
                                    <Text style={styles.dim}>
                                        검색어를 입력해 주세요.
                                    </Text>
                                </View>
                            ) : (
                                <View style={styles.center}>
                                    <Text style={styles.dim}>
                                        검색 결과가 없습니다.
                                    </Text>
                                </View>
                            )
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefetching}
                                onRefresh={refetch}
                            />
                        }
                        contentContainerStyle={
                            flatData.length === 0
                                ? styles.listEmptyPadding
                                : undefined
                        }
                    />
                )}
            </Titled>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
    },
    errorText: { color: "#ef4444" },
    dim: { color: "#6B7280" },
    footer: { paddingVertical: 16, alignItems: "center" },
    listEmptyPadding: { flexGrow: 1, justifyContent: "center" },
});
