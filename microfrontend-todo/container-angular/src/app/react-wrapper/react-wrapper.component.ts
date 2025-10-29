import { Component, ElementRef, OnInit, OnDestroy, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-react-wrapper',
  template: '<div #reactContainer style="width: 100%; min-height: 500px; border: 1px solid #ddd; border-radius: 8px;"></div>',
  styleUrls: ['./react-wrapper.component.scss']
})
export class ReactWrapperComponent implements OnInit, OnDestroy {
  @ViewChild('reactContainer', { static: true }) reactContainer!: ElementRef;
  private iframe?: HTMLIFrameElement;

  constructor(private renderer: Renderer2) {}

  async ngOnInit() {
    try {
      await this.loadReactMicrofrontend();
    } catch (error) {
      console.error('Failed to load React microfrontend:', error);
      this.showErrorMessage(error);
    }
  }

  private async loadReactMicrofrontend() {
    // Create iframe to embed React app directly
    // If React app is not running, iframe will show connection error
    this.iframe = this.renderer.createElement('iframe');
    this.renderer.setAttribute(this.iframe, 'src', 'http://localhost:3002');
    this.renderer.setAttribute(this.iframe, 'style', 'width: 100%; height: 600px; border: none; border-radius: 8px;');
    this.renderer.setAttribute(this.iframe, 'title', 'React Todo App');

    // Add loading indicator
    if (this.iframe) {
      this.iframe.onload = () => {
        console.log('React app loaded successfully');
      };

      this.iframe.onerror = () => {
        console.error('Failed to load React app');
        this.showErrorMessage('React app is not running on port 3001');
      };
    }

    // Add iframe to container
    this.renderer.appendChild(this.reactContainer.nativeElement, this.iframe);
  }

  private showErrorMessage(error: any) {
    this.reactContainer.nativeElement.innerHTML = `
      <div style="padding: 20px; text-align: center; color: red; border: 1px solid #ff6b6b; border-radius: 8px; background: #ffe0e0;">
        <h3>⚠️ Failed to load React Todo App</h3>
        <p><strong>Please ensure:</strong></p>
        <ul style="text-align: left; display: inline-block;">
          <li>React microfrontend is running on port 3001</li>
          <li>Run: <code>cd todoproject && npm run dev</code></li>
          <li>Check console for more details</li>
        </ul>
        <details style="margin-top: 1rem;">
          <summary>Error Details</summary>
          <pre style="text-align: left; background: #f5f5f5; padding: 1rem; margin-top: 0.5rem; overflow: auto;">${error}</pre>
        </details>
        <div style="margin-top: 1rem;">
          <button onclick="window.location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            🔄 Retry
          </button>
        </div>
      </div>
    `;
  }

  ngOnDestroy() {
    if (this.iframe) {
      this.renderer.removeChild(this.reactContainer.nativeElement, this.iframe);
    }
  }
}
