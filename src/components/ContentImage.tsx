import { useCallback, useEffect, useRef, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

type ContentImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
    src: string;
    alt: string;
    frameClassName?: string;
};

// A new source gets its own request state and cancels the previous source's retry.
export default function ContentImage(props: ContentImageProps) {
    return <ImageRequest key={props.src} {...props} />;
}

function ImageRequest({ src, alt, frameClassName = 'relative h-full w-full', onLoad, onError, style, ...props }: ContentImageProps) {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [retrySrc, setRetrySrc] = useState<string | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const retryTimer = useRef<number | null>(null);

    const cancelRetry = useCallback(() => {
        if (retryTimer.current !== null) window.clearTimeout(retryTimer.current);
        retryTimer.current = null;
    }, []);

    useEffect(() => cancelRetry, [cancelRetry]);

    const failed = useCallback(() => {
        if (!imageRef.current || retryTimer.current !== null) return;
        if (retrySrc !== null || !src) {
            setStatus('error');
            return;
        }
        retryTimer.current = window.setTimeout(() => {
            retryTimer.current = null;
            const url = new URL(src, document.baseURI);
            url.searchParams.set('_image_retry', String(Date.now()));
            setRetrySrc(url.href);
        }, 500);
    }, [retrySrc, src]);

    const attachImage = useCallback((image: HTMLImageElement | null) => {
        imageRef.current = image;
        // Cached responses can finish before React attaches its load handler.
        if (image?.complete && image.currentSrc) {
            if (image.naturalWidth > 0) {
                cancelRetry();
                setStatus('loaded');
            } else if (image.currentSrc === image.src) {
                failed();
            }
        }
    }, [cancelRetry, failed]);

    return (
        <span className={`image-frame ${frameClassName}`} data-image-state={status} aria-busy={status === 'loading' || undefined}>
            <img
                {...props}
                ref={attachImage}
                src={retrySrc ?? src}
                srcSet={retrySrc ? undefined : props.srcSet}
                alt={alt}
                decoding={props.decoding ?? 'async'}
                aria-hidden={status === 'error' ? true : props['aria-hidden']}
                style={{ ...style, ...(status === 'error' ? { visibility: 'hidden' } : {}) }}
                onLoad={event => {
                    if (event.currentTarget.naturalWidth > 0) {
                        cancelRetry();
                        setStatus('loaded');
                    } else {
                        failed();
                    }
                    onLoad?.(event);
                }}
                onError={event => {
                    failed();
                    onError?.(event);
                }}
            />
            {status === 'error' && (
                <span role="img" aria-label={`${alt || 'Image'} — image unavailable`} className="image-unavailable">
                    <span aria-hidden="true">Image unavailable</span>
                </span>
            )}
        </span>
    );
}
