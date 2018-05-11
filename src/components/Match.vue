<template>
  <div class="two column computer only row">
    <div class="info-match four wide column">
        <div class="item">{{match.dateMatch}}</div>
        <div class="item"><i class="map marker icon"></i>{{match.stade}}</div>
        <div class="item"><i class="home icon"></i><span class="content">{{match.ville}}</span></div>
    </div>
    <div class="twelve wide column">
        <div class="ui grid six column computer only row form">
            <div class="ui image two wide column">
                <img class="ui tiny image" :src="match.equipe1.flag" alt="image"/>
            </div>
            <div class="two wide column equipe">{{match.equipe1.nom}}</div>
            <div class="two wide column score-match"><input type="text" class="disabled field" :value="match.scoreEquipe1 || 0"/></div>
            <div class="two wide column inter"> - </div>
            <div class="two wide column score-match"><input type="text" class="disabled field" :value="match.scoreEquipe2 || 0"/></div>
            <div class="two wide column equipe">{{match.equipe2.nom}}</div>
            <div class="ui image two wide column">
                <img :src="match.equipe2.flag" alt="image"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    match: Object
  }
}
</script>

<style scoped>
    .score {
        font-size: 25px;
        border: 1px solid #BBB;
        background-color: #DDD;
        text-align:center;
    }
    .inter {
        font-size: 25px;
        text-align:center;
    }
    .column {
        padding-bottom:0rem;
        margin-top:1px;
    }
    .score-match {
        text-align: center;
        font-size: 20px;
    }
    .score-match input {
        text-align: center;
    }
    .equipe {
        vertical-align: baseline;
        text-align:center;
        padding-top:23.5px !important;
    }
</style>
