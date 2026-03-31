import useOrderStore from "../lib/orderStore";
import ClinicianView from "../components/ClinicianView";
import FulfillmentView from "../components/FulfillmentView";

export function meta({}) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const user = useOrderStore(state => state.user);

  if (user == null) {
    return (
      <h1>Loading</h1>
    )
  }

  if (user.type == "clinician") {
    return (
      <ClinicianView />
    )
  }

  return (
    <FulfillmentView />
  )
}
