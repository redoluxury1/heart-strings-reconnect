
import * as React from "react"
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

export type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export interface State {
  toasts: ToasterToast[]
}

export const TOAST_LIMIT = 1
export const TOAST_REMOVE_DELAY = 2000 // Changed from 3000 to 2000ms for faster auto-dismiss
