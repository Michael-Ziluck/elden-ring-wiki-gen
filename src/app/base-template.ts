export const BASE_TEMPLATE = `
<h3 class="bonfire">{{name}} Combat information</h3>
<ul>
   <li>Health: <span style="color: #ffffff;" data-mce-style="color: #ffffff;"><strong>{{health}}</strong> HP</span></li>
   <li>Poise: <span style="color: #ffffff;" data-mce-style="color: #ffffff;"><strong>{{poise}}</strong></span></li>
</ul>
<div class="row">
   <div class="col-sm-6">
      <h4 class="special">Negations (or Absorptions)</h4>
      <div class="row">
         <div class="col-sm-6">
            <ul>
               <li><a class="wiki_link" title="Elden Ring standard damage" href="/standard+damage" data-mce-href="/standard+damage">Physical (Standard)</a>: <strong>{{physical.standard}}</strong></li>
               <li><a class="wiki_link" title="Elden Ring Slash Damage" href="/Slash+Damage" data-mce-href="/Slash+Damage">Physical (Slash)</a>: <strong>{{physical.slash}}</strong></li>
               <li><a class="wiki_link" title="Elden Ring Strike Damage" href="/Strike+Damage" data-mce-href="/Strike+Damage">Physical (Strike)</a>: <strong>{{physical.strike}}</strong></li>
               <li><a class="wiki_link" title="Elden Ring Pierce Damage" href="/Pierce+Damage" data-mce-href="/Pierce+Damage">Physical (Pierce)</a>: <strong>{{physical.pierce}}</strong></li>
            </ul>
         </div>
         <div class="col-sm-6">
            <ul>
               <li><a class="wiki_link" style="color: #3fbddd;" data-mce-style="color: #3fbddd;" title="Elden Ring Magic Damage"     href="/Magic+Damage"     data-mce-href="/Magic+Damage"    ><img title="Magic Icon"      alt="Magic Icon"      width="20" height="20" src="/file/Elden-Ring/magic-upgrades-elden-ring-wiki-guide-30.png"      data-mce-src="/file/Elden-Ring/magic-upgrades-elden-ring-wiki-guide-30.png"    >Magic</a>:     <strong>{{magic.magic}}</strong></li>
               <li><a class="wiki_link" style="color: #cc9d57;" data-mce-style="color: #cc9d57;" title="Elden Ring Fire Damage"      href="/Fire+Damage"      data-mce-href="/Fire+Damage"     ><img title="Fire Icon"       alt="Fire Icon"       width="20" height="20" src="/file/Elden-Ring/fire-upgrades-elden-ring-wiki-guide-30.png"       data-mce-src="/file/Elden-Ring/fire-upgrades-elden-ring-wiki-guide-30.png"     >Fire</a>:      <strong>{{magic.fire}}</strong></li>
               <li><a class="wiki_link" style="color: #d5d559;" data-mce-style="color: #d5d559;" title="Elden Ring Lightning Damage" href="/Lightning+Damage" data-mce-href="/Lightning+Damage"><img title="Lightning Icon"  alt="Lightning Icon"  width="20" height="20" src="/file/Elden-Ring/lightning-upgrades-elden-ring-wiki-guide-30.png"  data-mce-src="/file/Elden-Ring/lightning-upgrades-elden-ring-wiki-guide-30.png">Lightning</a>: <strong>{{magic.lightning}}</strong></li>
               <li><a class="wiki_link" style="color: #ffcc99;" data-mce-style="color: #ffcc99;" title="Elden Ring Holy Damage"      href="/Holy+Damage"      data-mce-href="/Holy+Damage"     ><img title="Holy Icon"       alt="Holy Icon"       width="20" height="20" src="/file/Elden-Ring/holy-upgrades-elden-ring-wiki-guide-30.png"       data-mce-src="/file/Elden-Ring/holy-upgrades-elden-ring-wiki-guide-30.png"     >Holy</a>: <strong>{{magic.holy}}</strong></li>
            </ul>
         </div>
      </div>
      <p>The negation numbers are the % of your damage that gets blocked. For example, if a negation is 60, 40% of that damage by that type will go through and 60% will be negated. Bigger number = less damage. A negation of 100 means no damage goes through, and a negation of -100 mean the enemy takes 2x damage from that source. 0 means damage goes pretty much as is.</p>
   </div>
   <div class="col-sm-6">
      <h4 class="special">Resistances</h4>
      <ul>
         <li><a class="wiki_link" title="Poison"       href="/Poison"       data-mce-href="/Poison">      <img title="Poison Icon"       src="/file/Elden-Ring/poison_status_effect_elden_ring_wiki_guide_25px.png"      alt="Poison Icon"       width="20" data-mce-src="/file/Elden-Ring/poison_status_effect_elden_ring_wiki_guide_25px.png">Poison</a>: <strong>{{resistances.poison}}</strong></li>
         <li><a class="wiki_link" title="Scarlet Rot"  href="/Scarlet+Rot"  data-mce-href="/Scarlet+Rot"> <img title="Scarlet Rot Icon"  src="/file/Elden-Ring/scarlet_rot_status_effect_elden_ring_wiki_guide_25px.png" alt="Scarlet Rot Icon"  width="20" data-mce-src="/file/Elden-Ring/scarlet_rot_status_effect_elden_ring_wiki_guide_25px.png">Scarlet Rot</a>: <strong>{{resistances.scarletRot}}</strong></li>
         <li><a class="wiki_link" title="Hemorrhage"   href="/Hemorrhage"   data-mce-href="/Hemorrhage">  <img title="Hemmorage Icon"    src="/file/Elden-Ring/hemorrhage_status_effect_elden_ring_wiki_guide_25px.png"  alt="Hemmorage Icon"    width="20" data-mce-src="/file/Elden-Ring/hemorrhage_status_effect_elden_ring_wiki_guide_25px.png">Hemorrhage</a>: <strong>{{resistances.hemorrhage}}</strong></li>
         <li><a class="wiki_link" title="Frostbite"    href="/Frostbite"    data-mce-href="/Frostbite">   <img title="Frostbite Icon"    src="/file/Elden-Ring/frostbite_status_effect_elden_ring_wiki_guide_25px.png"   alt="Frostbite Icon"    width="20" data-mce-src="/file/Elden-Ring/frostbite_status_effect_elden_ring_wiki_guide_25px.png">Frostbite</a>: <strong>{{resistances.frostbite}}</strong></li>
         <li><a class="wiki_link" title="Sleep"        href="/Sleep"        data-mce-href="/Sleep">       <img title="Sleep Icon"        src="/file/Elden-Ring/sleep_status_effect_elden_ring_wiki_guide_25px.png"       alt="Sleep Icon"        width="20" data-mce-src="/file/Elden-Ring/sleep_status_effect_elden_ring_wiki_guide_25px.png">Sleep</a>: <strong>{{resistances.sleep}}</strong></li>
         <li><a class="wiki_link" title="Madness"      href="/Madness"      data-mce-href="/Madness">     <img title="Madness Icon"      src="/file/Elden-Ring/madness_status_effect_elden_ring_wiki_guide_25px.png"     alt="Madness Icon"      width="20" data-mce-src="/file/Elden-Ring/madness_status_effect_elden_ring_wiki_guide_25px.png">Madness</a>: <strong>{{resistances.madness}}</strong></li>
      </ul>
      <p>The resistance numbers are the buildup amount to trigger it. For example, if a resistance is 100 you must deal 100 points of the given buildup to trigger it. Note that these go down over time, and increase each time the effect procs.</p>
   </div>
</div>
`;
