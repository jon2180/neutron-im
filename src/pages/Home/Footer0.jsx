import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

function Footer(footerProps) {
  const { ...props } = footerProps;
  const { dataSource } = props;
  delete props.dataSource;
  delete props.isMobile;
  return (
    <div {...props} {...dataSource.wrapper}>
      <OverPack {...dataSource.OverPack}>
        <TweenOne
          animation={{ y: '+=30', opacity: 0, type: 'from' }}
          key="footer"
          {...dataSource.copyright}
        >
          {dataSource.copyright.children}
        </TweenOne>
      </OverPack>
    </div>
  );
}

export default Footer;
