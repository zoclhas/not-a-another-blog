import "@/styles/main.scss";
import "@/styles/prism.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

import { Provider } from "react-redux";
import { wrapper } from "@/redux/store";

import { Header } from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    // const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="system" attribute="class">
                <Head>
                    <meta name="theme-color" content="#030711" />
                </Head>
                <Header />
                <main className="max-md:pb-[76px]">
                    <Component {...pageProps} />
                    <Toaster />
                </main>
            </ThemeProvider>
        </Provider>
    );
}
