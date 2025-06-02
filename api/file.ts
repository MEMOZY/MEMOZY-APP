import { apiClient } from "./client";

const getPresignedUrls = async (
    metadataList: {
        filename: string;
    }[],
    fileDomain: "MEMORY_TEMP_PHOTOS" | "PROFILE_IMAGE" = "MEMORY_TEMP_PHOTOS"
) => {
    const fileInfos = metadataList.map((data) => ({
        fileName: data.filename,
        fileDomain: fileDomain,
    }));

    const response = await apiClient.post(
        "/files/pre-signed-urls",
        {
            fileInfos,
        },
        {
            withAuth: true,
        }
    );

    if (!response) {
        throw new Error("파일 업로드에 실패했습니다.");
    }
    if (response.status !== 200) {
        throw new Error("파일 업로드에 실패했습니다.");
    }
    return response.data;
};

const uploadToPresignedUrl = async (
    metadataList: { uri: string; filename: string }[],
    presignedUrls: { preSignedUrl: string; fileKey: string }[]
) => {
    for (let i = 0; i < metadataList.length; i++) {
        const { uri } = metadataList[i];
        const { preSignedUrl } = presignedUrls[i];

        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const upload = await fetch(preSignedUrl, {
                method: "PUT",
                body: blob,
            });
            if (!upload.ok) {
                throw new Error("파일 업로드에 실패했습니다.");
            }
        } catch (err) {
            console.error(`[${i}] 에러 발생: ${err}`);
        }
    }
    return true;
};

export { getPresignedUrls, uploadToPresignedUrl };
