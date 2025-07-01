import type { Component } from "vue";

export interface TabItem {
  key: string;
  label: string;
  component: Component;
}