import {render} from "solid-js/web";

// (Optional) Based on the integration tools you are using,
// you might need to import the virtual:windi.css entry explicitly.
// Please check the docs of the tools for more details.
//import "virtual:windi.css";

import "./index.css";
import {Popup} from "./Popup";

render(Popup, document.body);
