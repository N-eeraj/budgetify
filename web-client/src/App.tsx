import { BrowserRouter } from "react-router";
import Router from "@router/index"
import { TooltipProvider } from "@components/ui/tooltip"

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
