import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { PrimitiveAtom } from "jotai/experimental";
import { splitAtom } from "jotai/utils";
import { OpticFor_ } from "optics-ts";
import { useCallback } from "react";
import { Actor } from "./store/actor";
import { lineAtom } from "./store/line";
import { Step } from "./store/step";

export const ApprovalLine = () => {
  const setLine = useSetAtom(lineAtom);
  const stepAtoms = useAtomValue(splitAtom(lineAtom));

  const handleAddStep = () => {
    setLine((prev) => [
      ...prev,
      {
        viewId: `${Math.random()}`,
        actors: [],
        step: prev.length,
        status: "pending",
      },
    ]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <button style={{ alignSelf: "flex-end" }} onClick={handleAddStep}>
        add
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {stepAtoms.map((stepAtom) => (
          <StepItem key={stepAtom.toString()} stepAtom={stepAtom} />
        ))}
      </div>
    </div>
  );
};

type StepItemProps = {
  stepAtom: PrimitiveAtom<Step>;
};

const focusActors = (optic: OpticFor_<Step>) => optic.prop("actors");

const StepItem = (props: StepItemProps) => {
  const setStep = useSetAtom(props.stepAtom);

  const focus = focusAtom(props.stepAtom, focusActors);
  const split = splitAtom(focus);

  const actorAtoms = useAtomValue(split);

  const handleAddActor = useCallback(() => {
    setStep((prev) => ({
      ...prev,
      actors: [
        ...prev.actors,
        {
          viewId: `${Math.random()}`,
          name: "",
          value: "",
        },
      ],
    }));
  }, [setStep]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Step</h2>
        <button style={{ alignSelf: "flex-end" }} onClick={handleAddActor}>
          add
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {actorAtoms.map((actorAtom) => (
          <ActorItem key={`${actorAtom}`} actorAtom={actorAtom} />
        ))}
      </div>
    </div>
  );
};

type ActorItemProps = {
  actorAtom: PrimitiveAtom<Actor>;
};

const ActorItem = (props: ActorItemProps) => {
  const [actor, setActor] = useAtom(props.actorAtom);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <input
        value={actor.name}
        onChange={(e) =>
          setActor((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <input
        value={actor.value}
        onChange={(e) =>
          setActor((prev) => ({ ...prev, value: e.target.value }))
        }
      />
    </div>
  );
};
