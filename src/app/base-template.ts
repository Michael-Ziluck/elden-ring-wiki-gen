export const BASE_TEMPLATE = `
<h3 class="bonfire">{{name}} Combat information</h3>
<ul>
   <li>Health: <span style="color: #ffffff;" data-mce-style="color: #ffffff;"><strong>{{health}}</strong> HP</span></li>
   <li>Poise: <span style="color: #ffffff;" data-mce-style="color: #ffffff;"><strong>{{poise}}</strong></span></li>
</ul>
<div class="row">
   <div class="col-sm-6">
      <h4 class="special">Absorptions</h4>
      <div class="row">
         <div class="col-sm-6">
            <ul>
               <li><a class="wiki_link" title="Elden Ring standard damage" href="/standard+damage" data-mce-href="/standard+damage">Phy (Standard)</a>: {{physical.standard}}</li>
               <li><a class="wiki_link" title="Elden Ring Slash Damage" href="/Slash+Damage" data-mce-href="/Slash+Damage">Phy (Slash)</a>: {{physical.slash}}</li>
               <li><a class="wiki_link" title="Elden Ring Strike Damage" href="/Strike+Damage" data-mce-href="/Strike+Damage">Phy (Strike)</a>: {{physical.strike}}</li>
               <li><a class="wiki_link" title="Elden Ring Pierce Damage" href="/Pierce+Damage" data-mce-href="/Pierce+Damage">Phy (Pierce)</a>: {{physical.pierce}}</li>
            </ul>
         </div>
         <div class="col-sm-6">
            <ul>
               <li><a class="wiki_link" style="color: #3fbddd;" title="Elden Ring Magic Damage" href="/Magic+Damage" data-mce-href="/Magic+Damage" data-mce-style="color: #3fbddd;">{{magic.magic}}</a>: 0</li>
               <li><a class="wiki_link" style="color: #cc9d57;" title="Elden Ring Fire Damage" href="/Fire+Damage" data-mce-href="/Fire+Damage" data-mce-style="color: #cc9d57;">{{magic.fire}}</a>: 20</li>
               <li><a class="wiki_link" style="color: #d5d559;" title="Elden Ring Lightning Damage" href="/Lightning+Damage" data-mce-href="/Lightning+Damage" data-mce-style="color: #d5d559;">{{magic.lightning}}</a>: 20</li>
               <li><a class="wiki_link" style="color: #ffcc99;" title="Elden Ring Holy Damage" href="/Holy+Damage" data-mce-href="/Holy+Damage" data-mce-style="color: #ffcc99;">{{magic.holy}}</a>: 20</li>
            </ul>
         </div>
      </div>
      <p>The absorption numbers are the % of your damage that gets blocked. For example, if an absorption is 60, 40% of that damage by that type will go through and 60% is absorbed. Bigger number = less damage. An absorption of 100 means no damage goes through, and a resistance of -100 mean the enemy takes 2x damage from that source. 0 means damage goes pretty much as is.</p>
   </div>
   <div class="col-sm-6">
      <h4 class="special">Resistances</h4>
      <ul>
         <li><a class="wiki_link" title="Poison"       href="/Poison"       data-mce-href="/Poison">       <img title="Poison Icon"      src="/file/Elden-Ring/poison_status_effect_elden_ring_wiki_guide_25px.png"      alt="Poison Icon"       width="20" data-mce-src="/file/Elden-Ring/poison_status_effect_elden_ring_wiki_guide_25px.png">Poison</a>: {{resistances.poison}}</li>
         <li><a class="wiki_link" title="Scarlet Rot"  href="/Scarlet+Rot"  data-mce-href="/Scarlet+Rot"> <img title="Scarlet Rot Icon"  src="/file/Elden-Ring/scarlet_rot_status_effect_elden_ring_wiki_guide_25px.png" alt="Scarlet Rot Icon"  width="20" data-mce-src="/file/Elden-Ring/scarlet_rot_status_effect_elden_ring_wiki_guide_25px.png">Scarlet Rot</a>: {{resistances.scarletRot}}</li>
         <li><a class="wiki_link" title="Hemorrhage"   href="/Hemorrhage"   data-mce-href="/Hemorrhage">  <img title="Hemmorage Icon"    src="/file/Elden-Ring/hemorrhage_status_effect_elden_ring_wiki_guide_25px.png"  alt="Hemmorage Icon"    width="20" data-mce-src="/file/Elden-Ring/hemorrhage_status_effect_elden_ring_wiki_guide_25px.png">Hemorrhage</a>: {{resistances.hemorrhage}}</li>
         <li><a class="wiki_link" title="Frostbite"    href="/Frostbite"    data-mce-href="/Frostbite">   <img title="Frostbite Icon"    src="/file/Elden-Ring/frostbite_status_effect_elden_ring_wiki_guide_25px.png"   alt="Frostbite Icon"    width="20" data-mce-src="/file/Elden-Ring/frostbite_status_effect_elden_ring_wiki_guide_25px.png">Frostbite</a>: {{resistances.frostbite}}</li>
         <li><a class="wiki_link" title="Sleep"        href="/Sleep"        data-mce-href="/Sleep">       <img title="Sleep Icon"        src="/file/Elden-Ring/sleep_status_effect_elden_ring_wiki_guide_25px.png"       alt="Sleep Icon"        width="20" data-mce-src="/file/Elden-Ring/sleep_status_effect_elden_ring_wiki_guide_25px.png">Sleep</a>: {{resistances.sleep}}</li>
         <li><a class="wiki_link" title="Madness"      href="/Madness"      data-mce-href="/Madness">     <img title="Madness Icon"      src="/file/Elden-Ring/madness_status_effect_elden_ring_wiki_guide_25px.png"     alt="Madness Icon"      width="20" data-mce-src="/file/Elden-Ring/madness_status_effect_elden_ring_wiki_guide_25px.png">Madness</a>: {{resistances.madness}}</li>
         <li><a class="wiki_link" title="Death Blight" href="/Death Blight" data-mce-href="/Death Blight"><img title="Death Blight Icon" src="/file/Elden-Ring/blight_status_effect_elden_ring_wiki_guide_25px.png"      alt="Death Blight Icon" width="20" data-mce-src="/file/Elden-Ring/blight_status_effect_elden_ring_wiki_guide_25px.png">Death Blight</a>: {{resistances.deathBlight}}</li>
      </ul>
      <p>The resistance numbers are the buildup amount to trigger it. For example, if a resistance is 100 you must deal 100 points of the given buildup to trigger it. Note that these go down over time, and increase each time the effect procs.</p>
   </div>
</div>
`;
