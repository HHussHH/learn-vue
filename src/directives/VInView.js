import inView from "in-view";
export default {
  mounted(el, binding) {
    inView(`.${el.className}`).on("enter", () => {
      binding.value();
    });
  },
  name: "view",
};
