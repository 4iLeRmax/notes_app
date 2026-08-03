const React = require("react");

const cache = new Map();
export const motion = new Proxy(
  {},
  {
    get: (_target: any, tag: string) => {
      if (!cache.has(tag)) {
        cache.set(
          tag,
          React.forwardRef((props: any, ref: any) => {
            const {
              initial,
              animate,
              exit,
              transition,
              layout,
              layoutId,
              variants,
              whileHover,
              whileTap,
              whileFocus,
              whileDrag,
              whileInView,
              drag,
              dragConstraints,
              dragElastic,
              dragMomentum,
              onDragEnd,
              onDragStart,
              onAnimationStart,
              onAnimationComplete,
              ...domProps
            } = props;
            return React.createElement(tag, { ...domProps, ref });
          }),
        );
      }
      return cache.get(tag);
    },
  },
);

export const AnimatePresence = ({ children }: { children: React.ReactNode }) =>
  children;

export const Reorder = {
  Group: React.forwardRef(
    (
      { values, onReorder, axis, as, layoutScroll, ...domProps }: any,
      ref: any,
    ) => React.createElement("ul", { ...domProps, ref }),
  ),
  Item: React.forwardRef(
    (
      {
        value,
        drag,
        dragConstraints,
        dragElastic,
        dragMomentum,
        dragListener,
        dragControls,
        onDragStart,
        onDragEnd,
        onDrag,
        whileDrag,
        layout,
        layoutId,
        ...domProps
      }: any,
      ref: any,
    ) => React.createElement("li", { ...domProps, ref }),
  ),
};
