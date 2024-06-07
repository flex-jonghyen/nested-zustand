import { useStore } from "./store/store";

export interface ActorProps {
  viewId: string;
  deleteActor: (viewId: string) => void;
}

export const ActorItem = (props: ActorProps) => {
  const { getActor, updateName, updateValue } = useStore((state) => ({
    getActor: state.getActor,
    updateName: state.updateName,
    updateValue: state.updateValue,
  }));

  const actor = getActor(props.viewId);
  if (actor === undefined) {
    return;
  }

  return (
    <div>
      <p>{actor.viewId}</p>
      <input
        value={actor.name}
        onChange={(e) => updateName(e.target.value, actor.viewId)}
      />
      <input
        value={actor.value}
        onChange={(e) => updateValue(e.target.value, actor.viewId)}
      />
    </div>
  );
};

export interface StepProps {
  viewId: string;
  deleteStep: (viewId: string) => void;
}

export const StepItem = (props: StepProps) => {
  const { getStep, updateStep, updateStatus, appendActor, deleteActor } =
    useStore((state) => ({
      getStep: state.getStep,
      updateStep: state.updateStep,
      updateStatus: state.updateStatus,
      appendActor: state.appendActor,
      deleteActor: state.deleteActor,
    }));

  const step = getStep(props.viewId);

  if (step === undefined) {
    return;
  }

  return (
    <div>
      <p>{step.viewId}</p>
      <input
        value={step.step}
        onChange={(e) => updateStep(Number(e.target.value), step.viewId)}
      />
      <input
        value={step.status}
        onChange={(e) => updateStatus(e.target.value, step.viewId)}
      />
      <button
        onClick={() =>
          appendActor(
            { name: "default", value: "", viewId: `${Date.now()}` },
            step.viewId
          )
        }
      >
        Add Actor
      </button>
      <div>
        {step.actors.map((actor) => (
          <ActorItem
            key={actor.viewId}
            viewId={actor.viewId}
            deleteActor={deleteActor}
          />
        ))}
      </div>
    </div>
  );
};

export interface ApprovalLineProps {}

export const ApprovalLine = () => {
  const { line, appendStep, deleteStep } = useStore((state) => ({
    line: state.line,
    appendStep: state.appendStep,
    deleteStep: state.deleteStep,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Approval Line</h1>
      <button
        style={{ alignSelf: "flex-end" }}
        onClick={() =>
          appendStep({
            viewId: `${Date.now()}`,
            actors: [],
            status: "new",
            step: 10,
          })
        }
      >
        Add Step
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {line.map((step) => (
          <StepItem
            key={step.viewId}
            viewId={step.viewId}
            deleteStep={deleteStep}
          />
        ))}
      </div>
    </div>
  );
};
