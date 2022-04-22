import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import './index.scss';
import { store } from './store';

ReactDOM.render(
  /**
   * StrictModeにしておくと、
   *  ● 安全でないライフサイクル
   *  ● 文字列refAPIの使用
   *  ● findDOMNodeの使用
   *  ● 意図しない副作用
   *  ● contextAPIの使用
   * を検知して警告してくれる（※開発版ビルドのみ）
   */
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
