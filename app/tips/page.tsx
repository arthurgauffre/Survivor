import SpawnHeadband from "../component/SpawnHeadband";
import Collapsible from "../component/collapse";

export default function Home() {
  return (
    <SpawnHeadband title="Tips">
      <div>
        <h1> This is A TEST </h1>
      </div>

      <div className="bg-white">
        <Collapsible title="tkt">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia sed
          eos vitae molestias eveniet, est quas, at, iure porro ex natus et
          possimus numquam incidunt quisquam consequatur? Aliquid, non libero.
        </Collapsible>
      </div>
    </SpawnHeadband>
  );
}
