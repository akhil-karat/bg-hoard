import { Tree, formatFiles, updateJson, readJson} from '@nrwl/devkit';

function getScopes(nxJson: any) {
  const projects: any[] = Object.values(nxJson.projects);
  const allScopes: string[] = projects
    .map((project) =>
      project.tags
        // take only those that point to scope
        .filter((tag: string) => tag.startsWith('scope:'))
    )
    // flatten the array
    .reduce((acc, tags) => [...acc, ...tags], [])
    // remove prefix `scope:`
    .map((scope: string) => scope.slice(6));
  // remove duplicates
  return Array.from(new Set(allScopes));
}

export default async function (tree: Tree) {
  const scopes = getScopes(readJson(tree, 'nx.json'));
   await updateJson(tree, 'tools/generators/util-lib/schema.json', (schemaJson) => {
    
    schemaJson.properties.directory['x-prompt'].items = scopes.map((scope) => ({
      value: scope,
      label: scope,
    }));

    return schemaJson;
  });
  await formatFiles(tree); // this fix eslint errors after modifying the jsons
}
