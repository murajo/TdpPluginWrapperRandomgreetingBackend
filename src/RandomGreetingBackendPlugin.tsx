import {
  BackendPluginInterface,
  BackendPluginSurface,
  PluginEnvironment,
} from '@vmware-tanzu/core-backend';
import { Router } from 'express';
import { createRouter } from '@strawberryjam/plugin-randomgreeting-backend';

const createPlugin = () => {
  return async (env: PluginEnvironment): Promise<Router> => {
    return await createRouter({
      logger: env.logger,
      config: env.config,
    });
  };
};

export const RandomGreetingBackendPlugin: BackendPluginInterface =
  () => surfaces =>
    surfaces.applyTo(BackendPluginSurface, backendPluginSurface => {
      backendPluginSurface.addPlugin({
        name: 'randomgreeting',
        pluginFn: createPlugin(),
      });
    });