//package com.marouane.usertoken.config;
//
//import com.marouane.usertoken.service.JwtService;
//import com.marouane.usertoken.service.TokenService;
//import com.marouane.usertoken.service.MyUserDetailsService;
//import com.marouane.usertoken.service.TokenService;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.NonNull;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
////@RequiredArgsConstructor
//public class JwtFilter extends OncePerRequestFilter {
//    @Autowired
//    JwtService jwtService;
//    @Autowired
//    ApplicationContext context;
//    @Autowired
//    TokenService tokenService;
//    @Override
//    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {
//        String authHeader = request.getHeader("Authorization");
//        String token = null;
//        String userEmail = null;
//
//        if(authHeader != null && authHeader.startsWith("Bearer ")){
//            token = authHeader.substring(7);
//            userEmail = jwtService.extractUserEmail(token);
//        }
//
//        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication()==null){
//            UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(userEmail);
////            boolean isTokenValid = (!tokenService.getTokenObjByToken(token).isExpired() && !tokenService.getTokenObjByToken(token).isRevoked());
//            if(jwtService.validateToken(token, userDetails)){ //&& isTokenValid   && !tokenService.getTokenObjByToken(token).isRevoked()
//                UsernamePasswordAuthenticationToken authToken =
//                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//
////                Token tokenObj = tokenService.getTokenObjByToken(token);
////                tokenObj.setLastUsedAt(new Date());
////                tokenService.updateToken(tokenObj.getId() ,tokenObj);
//            }
//        }
//        filterChain.doFilter(request, response);
//    }
//}
