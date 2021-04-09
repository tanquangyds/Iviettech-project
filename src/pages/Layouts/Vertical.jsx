import React, { PropsWithChildren, Suspense } from 'react';
import Nav from '../../components/NavTop/NavTop';

const loading = () => <div className="text-center" />;

const VerticalLayout = (props) => {
  return (
    <div className="app">
      <div id="wrapper">
        <div className="content-page">
          <div className="content">
            <div>
              <Nav/>
              <Suspense fallback={loading()}>{props.children}</Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalLayout;
