import { Tree, formatFiles, updateJson } from '@nrwl/devkit';

export default async function (tree: Tree, schema: any) {
  updateJson(tree, 'nx.json', (nxJson) => {
    
    Object.keys(nxJson.projects).forEach((appName) => {
      if (!nxJson.projects[appName].tags.some(tag => tag.startsWith('scope:'))) {
        const scope = appName.split('-')[0];
        nxJson.projects[appName].tags.push(`scope:${scope}`);
      }

    });

    return nxJson;
  });
  await formatFiles(tree);
}
