import {useLoaderData} from "@remix-run/react";
import {useTina} from "tinacms/dist/react";
import client from "../.tina/__generated__/client";
import {TinaMarkdown} from "tinacms/dist/rich-text";

const {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
} = require("@remix-run/react");

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const { props } = useLoaderData();
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;

  return (
    <html lang="en">
      <head>
        <Links />
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Application" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        Content: <TinaMarkdown content={content} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


export const loader = async ({ params }) => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
