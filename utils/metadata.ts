// utils/metadata.ts
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export const extractSelectedMetadata = async (selectedIds: string[]) => {
    const metadataList = [];

    for (const id of selectedIds) {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(id);
        let address = null;
        if (assetInfo.location) {
            const { latitude, longitude } = assetInfo.location;
            const location = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            address = location[0]?.formattedAddress;
        }

        metadataList.push({
            id: assetInfo.id,
            uri: assetInfo.localUri,
            filename: assetInfo.filename,
            creationTime: new Date(assetInfo.creationTime),
            location: address,
        });
    }

    metadataList.sort((a, b) => {
        return a.creationTime.getTime() - b.creationTime.getTime();
    });

    return metadataList;
};
