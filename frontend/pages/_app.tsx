import "@/styles/main.scss";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Provider } from "react-redux";
import { wrapper } from "@/redux/store";

import { Header } from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="system" attribute="class">
                <Header />
                <main className="max-md:pb-[76px]">
                    <Component {...pageProps} />
                    <Toaster />
                </main>
            </ThemeProvider>
        </Provider>
    );
}
