package com.chiranjeeva.portfolio.contact;

import org.springframework.stereotype.Component;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/** Tiny in-memory limiter: at most 5 contact messages per client per hour. */
@Component
public class ContactRateLimiter {

    private static final int MAX_PER_WINDOW = 5;
    private static final long WINDOW_MS = 60L * 60L * 1000L;
    private static final int MAX_TRACKED_CLIENTS = 10_000;

    private final Map<String, Deque<Long>> hits = new ConcurrentHashMap<>();

    public boolean tryAcquire(String clientKey) {
        if (hits.size() > MAX_TRACKED_CLIENTS) {
            hits.clear(); // crude protection against unbounded growth
        }
        long now = System.currentTimeMillis();
        Deque<Long> queue = hits.computeIfAbsent(clientKey, k -> new ArrayDeque<>());
        synchronized (queue) {
            while (!queue.isEmpty() && now - queue.peekFirst() > WINDOW_MS) {
                queue.pollFirst();
            }
            if (queue.size() >= MAX_PER_WINDOW) {
                return false;
            }
            queue.addLast(now);
            return true;
        }
    }
}
