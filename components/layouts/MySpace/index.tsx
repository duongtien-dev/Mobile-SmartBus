import React, { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, View, type ViewProps } from 'react-native';

type WithClassName = ViewProps & { className?: string };

const Header: React.FC<PropsWithChildren<WithClassName>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <View
      className={['px-6 py-4', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </View>
  );
};

const Content: React.FC<PropsWithChildren<WithClassName>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <View
      className={['px-6 pb-6', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </View>
  );
};

const ScrollableContent: React.FC<PropsWithChildren<WithClassName>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className={['flex-1', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

type MySpaceRootProps = PropsWithChildren<WithClassName>;
type MySpaceType = React.FC<MySpaceRootProps> & {
  Header: typeof Header;
  Content: typeof Content;
  ScrollableContent: typeof ScrollableContent;
};

const MySpaceRoot: React.FC<MySpaceRootProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <SafeAreaView
      className={['flex-1 bg-white', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

const MySpace = MySpaceRoot as MySpaceType;
MySpace.Header = Header;
MySpace.Content = Content;
MySpace.ScrollableContent = ScrollableContent;

export default MySpace;
