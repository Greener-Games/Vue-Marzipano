import { reactive } from "vue";

// Options passed to app.use(VueMarzipano, options). Kept in its own module so helpers and the
// composable can both read it without importing each other.
export const pluginOptions = reactive<any>({});

export function setPluginOptions(options: any) {
    Object.assign(pluginOptions, options);
}
