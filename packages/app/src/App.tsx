import { createApp } from '@backstage/frontend-defaults';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { SignInPage } from '@backstage/core-components';
import { githubAuthApiRef, SignInPageProps } from '@backstage/core-plugin-api';
import { SignInPageBlueprint } from '@backstage/plugin-app-react';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import { navModule } from './modules/nav';

import crossplaneResourcesPlugin from '@terasky/backstage-plugin-crossplane-resources-frontend/alpha';
import gitopsManifestUpdaterPlugin from '@terasky/backstage-plugin-gitops-manifest-updater/alpha';
import templateBuilderPlugin from '@terasky/backstage-plugin-template-builder/alpha';
import frontendExtensionsExplorerPlugin from '@terasky/backstage-plugin-frontend-extensions-explorer';
import apiDocsModuleCrdPlugin from '@terasky/backstage-plugin-api-docs-module-crd';

const signInPage = SignInPageBlueprint.make({
  params: {
    loader: async () =>
      (props: SignInPageProps) => (
        <SignInPage
          {...props}
          auto
          provider={{
            id: 'github-auth-provider',
            title: 'GitHub',
            message: 'Sign in using GitHub',
            apiRef: githubAuthApiRef,
          }}
        />
      ),
  },
});

export default createApp({
  features: [
    catalogPlugin,
    navModule,
    crossplaneResourcesPlugin,
    gitopsManifestUpdaterPlugin,
    templateBuilderPlugin,
    frontendExtensionsExplorerPlugin,
    apiDocsModuleCrdPlugin,
    createFrontendModule({
      pluginId: 'app',
      extensions: [signInPage],
    }),
  ],
});
