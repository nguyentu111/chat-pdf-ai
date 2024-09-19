"use client";
import { RotateDirection, Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

interface ToolbarSlotsExampleProps {
  fileUrl: string;
}
export const PDF = ({ url }: { url: string }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div
        className="rpv-core__viewer"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#eeeeee",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            padding: "4px",
          }}
        >
          <Toolbar>
            {(props: ToolbarSlot) => {
              const {
                CurrentPageInput,
                Download,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                Print,
                ShowSearchPopover,
                Zoom,
                ZoomIn,
                ZoomOut,
                Rotate,
              } = props;
              return (
                <>
                  <div style={{ padding: "0px 2px" }}>
                    <ShowSearchPopover />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <ZoomOut />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <Zoom />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <ZoomIn />
                  </div>
                  <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                    <GoToPreviousPage />
                  </div>
                  <div style={{ padding: "0px 2px", width: "4rem" }}>
                    <CurrentPageInput />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    / <NumberOfPages />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <GoToNextPage />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <Download />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <Print />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <Rotate direction={RotateDirection.Forward} />
                  </div>
                </>
              );
            }}
          </Toolbar>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Viewer
            fileUrl={url}
            plugins={[toolbarPluginInstance]}
            defaultScale={1}
          />
        </div>
      </div>
    </Worker>
  );
};
