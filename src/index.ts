/**
 * @internal
 */
import './styles/main.less';
export { default } from './components/Root';
export { default as Uncontrolled } from './components/Root/Uncontrolled';
export type {
  RootProps as Props,
  UncontrolledRootProps as UncontrolledProps,
} from './typings/root-props';
