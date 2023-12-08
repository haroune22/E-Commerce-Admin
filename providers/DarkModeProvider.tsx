import { ThemeProvider } from "./ThemeProvider"

export const DarkModeProvider = (
    {children}:{children: React.ReactNode}
    )=>{
        return (
            <>
             <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
            </>
        )
}