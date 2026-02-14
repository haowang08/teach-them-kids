import { useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Simple tap-to-select / tap-to-place interaction hook.
 *
 * Generic over the item type `T`. Uses referential equality (===) by default
 * to compare items, so primitive values and stable object references work best.
 *
 * Usage in a 3D scene:
 *   const { selected, select, deselect, isSelected } = useTapInteraction<Letter>();
 *   // On mesh click: select(letter)
 *   // On drop zone click: if (selected) place(selected); deselect();
 */
export function useTapInteraction<T>() {
  const [selected, setSelected] = useState<T | null>(null);

  /** Select an item. If the same item is tapped again it is deselected (toggle). */
  const select = useCallback((item: T) => {
    setSelected((prev) => (prev === item ? null : item));
  }, []);

  /** Clear the current selection. */
  const deselect = useCallback(() => {
    setSelected(null);
  }, []);

  /** Check whether a given item is currently selected. */
  const isSelected = useCallback(
    (item: T) => selected === item,
    [selected],
  );

  return { selected, select, deselect, isSelected };
}
