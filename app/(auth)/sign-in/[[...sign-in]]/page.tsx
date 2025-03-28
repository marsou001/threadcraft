import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <div className="flex justify-center items-center py-32">
      <SignIn
        appearance={{
          elements: {
            card: {
              backgroundColor: "transparent",
              padding: 0,
            },
            cardBox: {
              width: "30rem",
            },
            headerTitle: {
              color: "white",
              fontSize: "2rem",
              letterSpacing: ".1rem",
            },
            headerSubtitle: {
              color: "rgb(197, 197, 197)",
              letterSpacing: ".05rem",
            },
            socialButtonsBlockButton: {
              backgroundColor: "#222",
              padding: "10px",
              borderWidth: "1px !important",
              borderStyle: "solid !important",
              borderColor: "#111 !important",
              boxShadow: "none !important",
              "&:hover": {
                backgroundColor: "#333",
              }
            },
            socialButtonsBlockButtonText: {
              color: "white"
            },
            dividerText: {
              color: "rgb(197, 197, 197)",
            },
            formFieldInput: {
              padding: "10px",
            },
            formButtonPrimary: {
              fontSize: "1rem",
              backgroundColor: "oklch(0.546 0.245 262.881)",
              borderWidth: 0,
              outlineWidth: 0,
              boxShadow: "none !important",
              padding: "10px",
              borderRadius: "9999px",
              "&:hover": {
                backgroundColor: "oklch(0.488 0.243 264.376)",
              }
            },
            footer: {
              backgroundColor: "black",
              backgroundImage: "none",
            },
            footerActionText: {
              color: "rgb(197, 197, 197)",
            },
            footerActionLink: {
              color: "rgb(224, 224, 224)",
              "&:hover": {
                color: "rgb(157, 157, 157)",
              }
            },
          }
        }}
      />
    </div>
  )
}

export default SignInPage;