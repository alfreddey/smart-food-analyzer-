export const useRouter = () => ({ replace: () => jest.fn() });

export const useSearchParams = () => new URLSearchParams("fClass=test");

export const usePathname = () => "/test-path";
