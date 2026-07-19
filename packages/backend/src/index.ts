/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend'));
backend.add(import('@backstage/plugin-proxy-backend'));

// scaffolder plugin
backend.add(import('@backstage/plugin-scaffolder-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(
  import('@backstage/plugin-scaffolder-backend-module-notifications'),
);
// terasky:claim-template / terasky:crd-template / terasky:catalog-info-cleaner
backend.add(
  import('@terasky/backstage-plugin-scaffolder-backend-module-terasky-utils'),
);
// roadiehq:utils:* actions used by the gitops-manifest-updater example template
backend.add(import('@roadiehq/scaffolder-backend-module-utils'));

// techdocs plugin
backend.add(import('@backstage/plugin-techdocs-backend'));

// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));
// See https://backstage.io/docs/auth/guest/provider

// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);
// Discovers Component/API/etc entities from catalog-info.yaml files across
// the polarpoint-io GitHub org, see catalog.providers.github in
// app-config.production.yaml
backend.add(import('@backstage/plugin-catalog-backend-module-github'));

// Ingests Crossplane claims + standard k8s workloads as catalog entities,
// and generates Scaffolder templates from XRDs. See kubernetesIngestor in
// app-config.production.yaml
backend.add(import('@terasky/backstage-plugin-kubernetes-ingestor'));

// See https://backstage.io/docs/features/software-catalog/configuration#subscribing-to-catalog-errors
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// permission plugin
backend.add(import('@backstage/plugin-permission-backend'));
// Real RBAC engine (roles/policies via permission.rbac in
// app-config.production.yaml) — replaced allow-all-policy so
// rbac-mcp-backend's role/policy endpoints exist to call.
backend.add(import('@backstage-community/plugin-rbac-backend'));

// search plugin
backend.add(import('@backstage/plugin-search-backend'));

// search engine
// See https://backstage.io/docs/features/search/search-engines
backend.add(import('@backstage/plugin-search-backend-module-pg'));

// search collators
backend.add(import('@backstage/plugin-search-backend-module-catalog'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs'));

// kubernetes plugin
backend.add(import('@backstage/plugin-kubernetes-backend'));
// Crossplane claim/composite/managed-resource visibility for the frontend
backend.add(import('@terasky/backstage-plugin-crossplane-resources-backend'));

// notifications and signals plugins
backend.add(import('@backstage/plugin-notifications-backend'));
backend.add(import('@backstage/plugin-signals-backend'));

// mcp actions plugin
backend.add(import('@backstage/plugin-mcp-actions-backend'));
// Expose catalog/scaffolder/rbac operations as MCP tools for AI agents.
// Registered plugin IDs (catalog-mcp, scaffolder-mcp, rbac-mcp) must be
// listed in backend.actions.pluginSources in app-config.yaml.
backend.add(import('@terasky/backstage-plugin-catalog-mcp-backend'));
backend.add(import('@terasky/plugin-scaffolder-mcp-backend'));
backend.add(import('@terasky/plugin-rbac-mcp-backend'));

backend.start();
