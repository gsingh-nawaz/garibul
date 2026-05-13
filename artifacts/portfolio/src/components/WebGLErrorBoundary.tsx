import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="w-full h-full flex items-center justify-center bg-black">
          <div className="font-mono text-xs text-white/20 text-center">
            <div className="mb-2 text-accent/40">[3D_ENGINE]</div>
            <div>WebGL unavailable in this environment</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
