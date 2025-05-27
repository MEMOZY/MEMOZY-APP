import WebView from "react-native-webview";

export default function Example() {
    return (
        <WebView
            source={{
                uri: "https://example.com",
            }}
        />
    );
}
