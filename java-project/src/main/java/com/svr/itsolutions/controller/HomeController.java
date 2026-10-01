package com.svr.itsolutions.controller;

import com.svr.itsolutions.model.SiteData;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @ModelAttribute("site")
    public Object site() { return SiteData.SITE; }

    @ModelAttribute("navLinks")
    public Object navLinks() { return SiteData.NAV_LINKS; }

    @ModelAttribute("featureCards")
    public Object featureCards() { return SiteData.FEATURE_CARDS; }

    @ModelAttribute("serviceCards")
    public Object serviceCards() { return SiteData.SERVICE_CARDS; }

    @ModelAttribute("dreamStats")
    public Object dreamStats() { return SiteData.DREAM_STATS; }

    @ModelAttribute("dreamImages")
    public Object dreamImages() { return SiteData.DREAM_IMAGES; }

    @ModelAttribute("heroImage")
    public Object heroImage() { return SiteData.HERO_IMAGE; }

    @ModelAttribute("worldStats")
    public Object worldStats() { return SiteData.WORLD_STATS; }

    @ModelAttribute("clientLogos")
    public Object clientLogos() { return SiteData.CLIENT_LOGOS; }

    @ModelAttribute("year")
    public Integer year() { return java.time.Year.now().getValue(); }

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @PostMapping("/submit-cv")
    public String submitCv(@RequestParam String firstName,
                           @RequestParam(required = false) String lastName,
                           @RequestParam(required = false) String phone,
                           @RequestParam String email,
                           Model model) {
        model.addAttribute("message",
                "Thanks " + firstName + "! Your CV has been received at " + email + ".");
        return "index";
    }
}
