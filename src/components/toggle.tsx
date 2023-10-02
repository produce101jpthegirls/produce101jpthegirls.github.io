import { Dispatch, FC, SetStateAction } from "react"
import { Switch } from "@headlessui/react";

type ToggleProps = {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  size: string;
  buttonSize: string;
  translate: string;
}

const Toggle: FC<ToggleProps> = ({ enabled, setEnabled, size, buttonSize, translate }) => (
  <Switch
    checked={enabled}
    onChange={setEnabled}
    className={`${enabled ? 'bg-pd-pink-400' : 'bg-zinc-300'} ${size}
      relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
  >
    <span className="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      className={`${enabled ? translate : 'translate-x-0'} ${buttonSize}
        pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
    />
  </Switch>
);

export default Toggle;
