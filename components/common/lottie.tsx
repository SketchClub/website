import Lottie from "lottie-react";

import designJson from "../../public/assets/lottie/design_old.json";
import developJson from "../../public/assets/lottie/develop_old.json";
import deliverJson from "../../public/assets/lottie/deliver_old.json";

export function DesignLottie(props: any) {
  return <Lottie animationData={designJson} {...props} />;
}
export function DevelopLottie(props: any) {
  return <Lottie animationData={developJson} {...props} />;
}
export function DeliverLottie(props: any) {
  return <Lottie animationData={deliverJson} {...props} />;
}
