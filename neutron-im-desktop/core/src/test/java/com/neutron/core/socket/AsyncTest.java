package com.neutron.core.socket;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class AsyncTest {

    public static void main(String[] args) {
        System.out.println("main函数开始执行");
        ExecutorService executor = Executors.newFixedThreadPool(2);
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
            System.out.println("===task start===");
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("===task finish===");
            return 3;
        });
        future.thenAccept(System.out::println);
        System.out.println("main函数执行结束");
    }
}
