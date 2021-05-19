/**
 * Type definitions
 */

export type Archetype = 'document' | 'collection';
export type DocumentOperation = 'write' | 'merge' | 'append' | 'increment';
export type CollectionOperation = 'create';
export type Operation = DocumentOperation | CollectionOperation;

/**
 * Designed to mimick the Python class.
 * See: https://github.com/cougargrades/publicdata/blob/c39c3bb603778b52b1dfe9231757ac602bc506fb/bundler/bundle/patch/patchfile.py
 */
export interface Patchfile {
  format: 'io.cougargrades.publicdata.patch';
  target: Target;
  actions: BaseAction[];
}

export type Target = {
  archetype: Archetype;
  path: string;
};

export interface BaseAction {
  operation: Operation;
  payload: any;
}

export interface WriteAction extends BaseAction {
  operation: 'write';
}

export interface MergeAction extends BaseAction {
  operation: 'merge';
}

export interface AppendAction extends BaseAction {
  operation: 'append';
  arrayfield: string;
  datatype:
    | 'number'
    | 'string'
    | 'object'
    | 'boolean'
    | 'firebase.firestore.DocumentReference';
}

export interface IncrementAction extends BaseAction {
  operation: 'increment';
  field: string;
  payload: number;
}

export interface CreateAction extends BaseAction {
  operation: 'create';
}
