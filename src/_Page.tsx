import {
  QueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

export const Page = () => {
  return (
    <QueryAsyncBoundary
      loading={() => (
        <Container>
          <p>Loading...</p>
        </Container>
      )}
      error={() => null}
    >
      <Section />
      <Footer />
    </QueryAsyncBoundary>
  );
};

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  return (
    <section>
      <h1>Title</h1>
      {props.children}
    </section>
  );
};

const Section = () => {
  return (
    <Container>
      <QueryAsyncBoundary error={() => "error!"}>
        <Content />
      </QueryAsyncBoundary>
    </Container>
  );
};

const Content = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["section"],
    queryFn: () => {
      return fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((res) =>
        res.json()
      );
    },
  });

  return <p>{JSON.stringify(data, null, 2)}</p>;
};

const Footer = () => {
  return (
    <footer>
      <p>Footer</p>
    </footer>
  );
};

export interface QueryAsyncBoundaryProps {
  children: ReactNode;
  loading?: () => ReactNode;
  error: (props: FallbackProps) => ReactNode;
}

export const QueryAsyncBoundary = (props: QueryAsyncBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={props.error}>
          {props.loading ? (
            <Suspense fallback={<props.loading />}>{props.children}</Suspense>
          ) : (
            props.children
          )}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
