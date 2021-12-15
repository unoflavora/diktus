import { useEffect } from "react";

const useMath = () => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image&async=true"
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  })
}

export default useMath