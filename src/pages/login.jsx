import Alert from "@mui/material/Alert";

import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Login() {
  return (
    <>
      <Switch {...label} defaultChecked />
      <div>loginaaaaaaaaaaaaaaa</div>
      <Alert severity="success">This is a success Alert.</Alert>
      <Alert severity="info">This is an info Alert.</Alert>
      <Alert severity="warning">This is a warning Alert.</Alert>
      <Alert severity="error">This is an error Alert.</Alert>
    </>
  );
}
