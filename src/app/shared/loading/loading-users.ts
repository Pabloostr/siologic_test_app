export class LoadingUsers {
    private timeout: any;
    isLoading = false;
    
    startLoading(): void { 
        this.timeout = setTimeout(() => {
            this.isLoading = true;
        }, 1000);
    }

    finishLoading(): void {
        this.isLoading = false;
        clearTimeout(this.timeout);
    }
}