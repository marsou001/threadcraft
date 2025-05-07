"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "text-white text-md flex items-center gap-2 py-2 px-3 rounded-lg",
          warning: "bg-orange-400/85",
          success: "bg-green-500/85",
          error: "bg-red-500/85",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
