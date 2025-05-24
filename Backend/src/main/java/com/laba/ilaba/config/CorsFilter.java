//package com.laba.ilaba.config;
//
//import jakarta.ws.rs.container.ContainerRequestContext;
//import jakarta.ws.rs.container.ContainerRequestFilter;
//import jakarta.ws.rs.container.ContainerResponseContext;
//import jakarta.ws.rs.container.ContainerResponseFilter;
//import jakarta.ws.rs.ext.Provider;
//
//import java.io.IOException;
//
//@Provider
//public class CorsFilter implements ContainerResponseFilter, ContainerRequestFilter {
//
//
//    @Override
//    public void filter(ContainerRequestContext requestContext) throws IOException {
//
//        if ("OPTIONS".equalsIgnoreCase(requestContext.getMethod())) {
//            requestContext.abortWith(
//                    jakarta.ws.rs.core.Response.ok().build()
//            );
//        }
//    }
//
//    @Override
//    public void filter(ContainerRequestContext requestContext,
//                       ContainerResponseContext responseContext) {
//
//        System.out.println(">>> CorsFilter triggered for: " + requestContext.getUriInfo().getPath());
//
//        responseContext.getHeaders().add("Access-Control-Allow-Origin", "http://localhost:5173");
//        responseContext.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization, Authorization");
//        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
//        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
//    }
//}
//
