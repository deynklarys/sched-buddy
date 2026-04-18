import { create } from 'zustand'
import { CanvasEngine } from './canvas-engine'
import { persist } from 'zustand/middleware'

export type SetObjectOverride = (id: string, override: ObjectOverride) => void

type ViewportActions = {
  setZoom: (zoom: number) => void
  setPan: (panX: number, panY: number) => void

  setObjectOverride: SetObjectOverride
  deleteObjectOverride: (id: string) => void

  resetViewport: () => void
}

export type ObjectOverride = {
  left: number
  top: number
  scaleX: number
  scaleY: number
  angle: number
}

export type ViewportState = {
  zoom: number
  panX: number
  panY: number

  objectOverrides: Record<string, ObjectOverride>
}

type CanvasEngineStoreActions = {
  setHasHydrated: () => void

  setEngine: (engine: CanvasEngine | null) => void
} & ViewportActions

type CanvasEngineStore = {
  hasHydrated: boolean

  engine: CanvasEngine | null

  actions: CanvasEngineStoreActions
} & ViewportState

export const useCanvasEngineStore = create<CanvasEngineStore>()(
  persist(
    (set, get) => ({
      hasHydrated: false,

      engine: null,

      zoom: 1,
      panX: 0,
      panY: 0,
      objectOverrides: {},
      actions: {
        setHasHydrated: () => set({ hasHydrated: true }),

        setEngine: (engine) => set({ engine }),

        setZoom: (zoom) => set({ zoom }),
        setPan: (panX, panY) => set({ panX, panY }),

        setObjectOverride: (id, override) => {
          set((state) => ({
            objectOverrides: { ...state.objectOverrides, [id]: override },
          }))
        },

        deleteObjectOverride: (id) =>
          set((state) => {
            const next = { ...state.objectOverrides }
            delete next[id]
            return { objectOverrides: next }
          }),

        resetViewport: () =>
          set({ zoom: 1, panX: 0, panY: 0, objectOverrides: {} }),
      },
    }),
    {
      name: 'canvas-context',
      /* Fields to store in localStorage. Don't serialize actions! It cannot be serialized. */
      partialize: (state) => ({
        zoom: state.zoom,
        panX: state.panX,
        panY: state.panY,
        objectOverrides: state.objectOverrides,
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Canvas Context hydrated!')
        state?.actions.setHasHydrated()
      },
    },
  ),
)

export function useCanvasEngine() {
  return useCanvasEngineStore((state) => state.engine)
}

// export function useCanvasViewport() {
//   return useCanvasEngineStore((s) => ({
//     zoom: s.zoom,
//     panX: s.panX,
//     panY: s.panY,
//     objectOverrides: s.objectOverrides,
//   }))
// }

export function useCanvasEngineHasHydrated() {
  return useCanvasEngineStore((state) => state.hasHydrated)
}

export function useCanvasEngineActions() {
  return useCanvasEngineStore((state) => state.actions)
}
